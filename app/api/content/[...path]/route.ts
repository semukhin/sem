import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import mime from 'mime';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const resolvedParams = await params;
    // content is in the root of the project
    const contentDir = path.join(process.cwd(), 'content');

    // params.path is an array of path segments, e.g. ['image.jpg']
    const filePath = path.join(contentDir, ...resolvedParams.path);

    // Security check: prevent directory traversal
    const relativePath = path.relative(contentDir, filePath);
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
        return new NextResponse('Access Denied', { status: 403 });
    }

    if (!fs.existsSync(filePath)) {
        return new NextResponse('File Not Found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const mimeType = mime.getType(filePath) || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
        headers: {
            'Content-Type': mimeType,
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
}
