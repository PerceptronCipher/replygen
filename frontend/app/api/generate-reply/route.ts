import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, context, tone } = await req.json()

  const response = await fetch('http://localhost:8000/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email_content: email, context }),
  })

  const data = await response.json()
  const reply = data.replies[tone.toLowerCase()]

  return NextResponse.json({ reply })
}