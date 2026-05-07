'use client'

import { useState, useTransition, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { registerParticipant } from '@/app/actions/register'

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await registerParticipant(formData)
      if (result.success) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg(result.error)
      }
    })
  }

  function handleClose() {
    onClose()
    // Reset form state after exit animation
    setTimeout(() => {
      setStatus('idle')
      setErrorMsg('')
      formRef.current?.reset()
    }, 450)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-ink/60"
            style={{ backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
          />

          {/* Panel — bottom sheet on mobile, centered on desktop */}
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center pointer-events-none px-0 md:px-4">
            <motion.div
              className="pointer-events-auto w-full md:max-w-[480px] bg-surface rounded-t-[28px] md:rounded-2xl shadow-2xl overflow-hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Drag handle — mobile only */}
              <div className="flex justify-center pt-3 pb-1 md:hidden">
                <div className="w-10 h-1 rounded-full bg-line" />
              </div>

              <div className="px-6 md:px-8 pt-4 md:pt-7 pb-8 md:pb-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-eyebrow text-moss mb-1">Inscripción</p>
                    <h2 className="font-display font-black text-ink text-2xl md:text-3xl leading-tight">
                      Café &{' '}
                      <span className="italic text-moss">Jardín</span>
                    </h2>
                  </div>
                  <button
                    onClick={handleClose}
                    aria-label="Cerrar"
                    className="w-9 h-9 rounded-full border border-line flex items-center justify-center hover:border-ink transition-colors shrink-0 mt-1"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M1 1l10 10M11 1L1 11"/>
                    </svg>
                  </button>
                </div>

                {/* Status: success */}
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="py-8 flex flex-col items-center text-center gap-4"
                    >
                      {/* Check icon */}
                      <motion.div
                        className="w-16 h-16 rounded-full bg-moss flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                      >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                      </motion.div>
                      <div>
                        <p className="font-display font-bold text-ink text-xl mb-2">¡Listo!</p>
                        <p className="text-ink-soft text-sm leading-relaxed max-w-[280px]">
                          Recibimos tu inscripción. Te escribiremos con los detalles de la próxima sesión.
                        </p>
                      </div>
                      <button
                        onClick={handleClose}
                        className="mt-2 px-6 py-2.5 rounded-full border border-moss text-moss text-sm font-medium hover:bg-moss hover:text-bg transition-colors duration-300"
                      >
                        Cerrar
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      ref={formRef}
                      onSubmit={handleSubmit}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                      noValidate
                    >
                      {/* Name */}
                      <div>
                        <label htmlFor="reg-name" className="text-eyebrow text-ink-soft block mb-2">
                          Nombre completo
                        </label>
                        <input
                          id="reg-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Tu nombre"
                          className="w-full px-4 py-3 rounded-xl border border-line bg-bg text-ink placeholder:text-ink-soft/50 text-sm focus:outline-none focus:border-moss transition-colors duration-200"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="reg-email" className="text-eyebrow text-ink-soft block mb-2">
                          Email
                        </label>
                        <input
                          id="reg-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="tu@email.com"
                          className="w-full px-4 py-3 rounded-xl border border-line bg-bg text-ink placeholder:text-ink-soft/50 text-sm focus:outline-none focus:border-moss transition-colors duration-200"
                        />
                      </div>

                      {/* Optional message */}
                      <div>
                        <label htmlFor="reg-message" className="text-eyebrow text-ink-soft block mb-2">
                          ¿Por qué te interesa? <span className="normal-case font-normal opacity-60">(opcional)</span>
                        </label>
                        <textarea
                          id="reg-message"
                          name="message"
                          rows={3}
                          placeholder="Cuéntanos un poco…"
                          className="w-full px-4 py-3 rounded-xl border border-line bg-bg text-ink placeholder:text-ink-soft/50 text-sm focus:outline-none focus:border-moss transition-colors duration-200 resize-none"
                        />
                      </div>

                      {/* Error */}
                      {status === 'error' && (
                        <motion.p
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-red-500 flex items-center gap-2"
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                            <path d="M6 0a6 6 0 110 12A6 6 0 016 0zm0 7.5a.75.75 0 000 1.5.75.75 0 000-1.5zm.75-4.25h-1.5l.25 4h1l.25-4z"/>
                          </svg>
                          {errorMsg}
                        </motion.p>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-4 rounded-full bg-moss text-bg font-semibold text-sm hover:bg-moss-deep transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isPending ? (
                          <>
                            <motion.div
                              className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            />
                            Enviando…
                          </>
                        ) : (
                          'Inscribirme a la próxima sesión'
                        )}
                      </button>

                      <p className="text-center text-ink-soft text-xs">
                        Cupo limitado · Entrada libre · Sin spam
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
