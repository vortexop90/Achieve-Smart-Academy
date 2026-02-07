import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Result from '@/models/Result';

export async function GET() {
  await dbConnect();
  try {
    const results = await Result.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch results' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const result = await Result.create(body);
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create result' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    if (!_id) {
        return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }
    const result = await Result.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
    if (!result) {
        return NextResponse.json({ success: false, error: 'Result not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update result' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
        return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }
    const result = await Result.findByIdAndDelete(id);
    if (!result) {
        return NextResponse.json({ success: false, error: 'Result not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete result' }, { status: 400 });
  }
}
