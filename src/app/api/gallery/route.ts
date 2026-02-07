import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Gallery from '@/models/Gallery';

export async function GET() {
  try {
    await dbConnect();
    const items = await Gallery.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch gallery items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const item = await Gallery.create(body);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create gallery item' }, { status: 400 });
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
    const item = await Gallery.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
    if (!item) {
        return NextResponse.json({ success: false, error: 'Gallery item not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update gallery item' }, { status: 400 });
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
    const item = await Gallery.findByIdAndDelete(id);
    if (!item) {
        return NextResponse.json({ success: false, error: 'Gallery item not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete gallery item' }, { status: 400 });
  }
}
