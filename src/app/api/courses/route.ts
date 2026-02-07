import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Course from '@/models/Course';

export async function GET() {
  await dbConnect();
  try {
    const courses = await Course.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const course = await Course.create(body);
    return NextResponse.json({ success: true, data: course }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create course' }, { status: 400 });
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
    const course = await Course.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
    if (!course) {
        return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update course' }, { status: 400 });
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
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
        return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete course' }, { status: 400 });
  }
}
