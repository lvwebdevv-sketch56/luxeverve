import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  if (!url) return new NextResponse('Missing URL', { status: 400 });

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch file');

    const buffer = await response.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Luxe_Verve_Catalogue.pdf"',
      },
    });
  } catch (error) {
    return new NextResponse('Error downloading file', { status: 500 });
  }
}
