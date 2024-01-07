import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

interface Segments {
    params: {
        id: string;
    }
}

export async function GET(request: Request, { params }: Segments) {
    const { id } = params;

    const todo = await prisma.todo.findUnique({
        where: {
            id
        }
    })

    if (todo == null) {
        return NextResponse.json(
            { message: `Todo by id ${id} not exist` },
            { status: 404 }
        );
    }

    return NextResponse.json(todo);
}