import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Test API called successfully!',
    timestamp: new Date().toISOString()
  });
}