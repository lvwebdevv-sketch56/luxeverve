import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let url = searchParams.get('url');
  if (!url) return new NextResponse('Missing URL', { status: 400 });

  if (url.includes('res.cloudinary.com')) {
    // We do NOT add fl_attachment because it causes 401 Unauthorized on accounts with strict transformations.
    // Our API route will handle the attachment headers instead.
    
    // Cloudinary requires .pdf extension for format conversion if not a raw file
    if (!url.includes('/raw/') && !url.toLowerCase().endsWith('.pdf')) {
      url += '.pdf';
    }
  }

  try {
    const fetchUrl = new URL(url).href;
    const response = await fetch(fetchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      }
    });
    if (!response.ok) {
      if (response.status === 401) {
        return new NextResponse(`Cloudinary Security Block: Your Cloudinary account currently restricts PDF delivery. Please go to Cloudinary Settings -> Security -> Restricted media types, and uncheck "PDF delivery".`, { status: 401 });
      }
      throw new Error(`Failed to fetch file (Status: ${response.status})`);
    }

    const buffer = await response.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Luxe_Verve_Catalogue.pdf"',
      },
    });
  } catch (error) {
    console.error('Download Proxy Error:', error);
    return new NextResponse(`Error downloading file: ${error.message}`, { status: 500 });
  }
}
