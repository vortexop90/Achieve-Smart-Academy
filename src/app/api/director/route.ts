import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Director from '@/models/Director';

export async function GET() {
  await dbConnect();
  try {
    const director = await Director.findOne().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: director });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch director info' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    // For Director, we can either update the existing one or create new.
    // Let's assume we always want the latest one, or we update the existing one.
    // Simpler: Just create a new one (or delete old ones). 
    // Better: Update if exists.
    
    let director = await Director.findOne();
    if (director) {
        Object.assign(director, body);
        await director.save();
    } else {
        director = await Director.create(body);
    }
    
    return NextResponse.json({ success: true, data: director }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update director info' }, { status: 400 });
  }
}
