import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Button pressed successfully! 🎉',
    timestamp: new Date().toISOString()
  });
}