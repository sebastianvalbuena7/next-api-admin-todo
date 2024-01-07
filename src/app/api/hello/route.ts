import { NextResponse, NextRequest } from 'next/server'

// rag
export async function GET(request: Request) {

    return NextResponse.json({
        hola: 'mundo',
        method: 'GET'
    });
}

export async function POST(request: Request) {

    return NextResponse.json({
        hola: 'mundo',
        method: 'POST'
    });
}