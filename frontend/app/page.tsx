'use client'
import { useState, useEffect } from 'react'
import {
  Send,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Trash2,
  History,
  X,
} from 'lucide-react'

// Type definition for a History Item
type ReplyHistory = {
  id: string
  email: string
  context: string
  tone: string
  text: string
  timestamp: number
}

export default function ReplyGenerator() {
  const [email, setEmail] = useState('')
  const [context, setContext] = useState('')
  const [replies, setReplies] = useState<{ tone: string; text: string }[]>([])
  const [history, setHistory] = useState<ReplyHistory[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [showHistory, setShowHistory] = useState(false)

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('reply_history')
    if (savedHistory) setHistory(JSON.parse(savedHistory))
  }, [])

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('reply_history', JSON.stringify(history))
  }, [history])

  const generateReplies = async (selectedTone: string) => {
    if (!email.trim()) return alert('Please paste an email first!')

    setIsLoading(true)
    try {
      const response = await fetch('/api/generate-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, context, tone: selectedTone }),
      })

      const data = await response.json()
      const newReplyText = data.reply

      // 1. Update Current View
      setReplies([{ tone: selectedTone, text: newReplyText }, ...replies])

      // 2. Add to Local History
      const newHistoryItem: ReplyHistory = {
        id: crypto.randomUUID(),
        email,
        context,
        tone: selectedTone,
        text: newReplyText,
        timestamp: Date.now(),
      }
      setHistory([newHistoryItem, ...history])
    } catch (error) {
      console.error('Failed to generate:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteHistoryItem = (id: string) => {
    setHistory(history.filter((item) => item.id !== id))
  }

  const clearAllHistory = () => {
    if (confirm('Are you sure you want to delete all history?')) {
      setHistory([])
    }
  }

  const loadFromHistory = (item: ReplyHistory) => {
    setEmail(item.email)
    setContext(item.context)
    setReplies([{ tone: item.tone, text: item.text }])
    setShowHistory(false)
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className='relative max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700'>
      {/* History Toggle Button */}
      <button
        onClick={() => setShowHistory(true)}
        className='fixed bottom-8 right-8 p-4 bg-white shadow-2xl rounded-full border border-slate-200 hover:bg-slate-50 transition-all z-40 group'
      >
        <History className='w-6 h-6 text-blue-600 group-hover:rotate-12 transition-transform' />
        {history.length > 0 && (
          <span className='absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full'>
            {history.length}
          </span>
        )}
      </button>

      {/* History Slide-over Component */}
      {showHistory && (
        <div className='fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm animate-in fade-in'>
          <div className='w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right duration-300'>
            <div className='flex justify-between items-center mb-8'>
              <h2 className='text-xl font-bold flex items-center gap-2'>
                <History className='w-5 h-5 text-blue-600' /> Generation Vault
              </h2>
              <button
                onClick={() => setShowHistory(false)}
                className='p-2 hover:bg-slate-100 rounded-lg'
              >
                <X className='w-5 h-5' />
              </button>
            </div>

            {history.length > 0 ? (
              <div className='space-y-4'>
                <button
                  onClick={clearAllHistory}
                  className='w-full py-2 text-sm text-red-500 font-medium hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2 border border-red-100'
                >
                  <Trash2 className='w-4 h-4' /> Clear All History
                </button>
                {history.map((item) => (
                  <div
                    key={item.id}
                    className='p-4 border border-slate-100 rounded-xl hover:border-blue-200 transition-all group relative bg-slate-50/50'
                  >
                    <div className='flex justify-between items-start mb-2'>
                      <span className='text-[10px] font-bold uppercase tracking-widest text-blue-500'>
                        {item.tone}
                      </span>
                      <button
                        onClick={() => deleteHistoryItem(item.id)}
                        className='text-slate-300 hover:text-red-500 transition-colors'
                      >
                        <Trash2 className='w-4 h-4' />
                      </button>
                    </div>
                    <p
                      className='text-sm text-slate-800 line-clamp-2 mb-3 cursor-pointer'
                      onClick={() => loadFromHistory(item)}
                    >
                      {item.text}
                    </p>
                    <div className='flex justify-between items-center'>
                      <span className='text-[10px] text-slate-400'>
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => loadFromHistory(item)}
                        className='text-[10px] font-bold text-blue-600 hover:underline'
                      >
                        REVIEW & EDIT
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-20'>
                <div className='bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <History className='w-8 h-8 text-slate-300' />
                </div>
                <p className='text-slate-400 text-sm'>
                  No history yet. Start generating!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main UI Header */}
      <section className='text-center space-y-2'>
        <h1 className='text-4xl font-extrabold tracking-tight text-slate-900'>
          AI Email <span className='text-blue-600'>Reply Generator</span>
        </h1>
        <p className='text-slate-500'>
          Professional drafts tailored to your brand voice.
        </p>
      </section>

      {/* Input Area */}
      <div className='glass-card p-6 md:p-8 space-y-6'>
        <div className='space-y-2'>
          <label className='text-sm font-semibold text-slate-700 ml-1'>
            Incoming Email
          </label>
          <textarea
            className='input-field h-48 resize-none shadow-sm'
            placeholder='Paste the email you received here...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-semibold text-slate-700 ml-1'>
            Context / Your Goal
          </label>
          <input
            className='input-field shadow-sm'
            placeholder="e.g. 'Politely decline the invite' or 'Ask for a follow-up meeting'"
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
        </div>

        <div className='pt-4'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {['Professional', 'Casual', 'Friendly'].map((tone) => (
              <button
                key={tone}
                disabled={isLoading}
                onClick={() => generateReplies(tone)}
                className={`btn-primary flex items-center justify-center gap-2 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <RotateCcw className='w-4 h-4 animate-spin' />
                ) : (
                  <Sparkles className='w-4 h-4' />
                )}
                {tone}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {replies.length > 0 && (
        <section className='space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-20'>
          <h2 className='text-xl font-bold text-slate-800 flex items-center gap-2'>
            <Send className='w-5 h-5 text-blue-600' /> Generated Options
          </h2>
          <div className='grid gap-6'>
            {replies.map((reply, index) => (
              <div
                key={index}
                className='glass-card p-6 border-l-4 border-l-blue-500 hover:shadow-2xl transition-all'
              >
                <div className='flex justify-between items-start mb-4'>
                  <span className='px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider'>
                    {reply.tone}
                  </span>
                  <button
                    onClick={() => copyToClipboard(reply.text, index)}
                    className='text-slate-400 hover:text-blue-600 transition-colors p-1'
                  >
                    {copiedIndex === index ? (
                      <Check className='w-5 h-5 text-green-500' />
                    ) : (
                      <Copy className='w-5 h-5' />
                    )}
                  </button>
                </div>
                <p className='text-slate-700 whitespace-pre-wrap leading-relaxed'>
                  {reply.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
