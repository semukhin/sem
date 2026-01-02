'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { NewsPost, Program } from '@/lib/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const PROGRAMS_FILE = path.join(DATA_DIR, 'programs.json');

// Ensure data directory exists
async function ensureDataDir() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
}

// --- NEWS POSTS ---

export async function getPosts(): Promise<NewsPost[]> {
    await ensureDataDir();
    try {
        const data = await fs.readFile(POSTS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return empty array
        return [];
    }
}

// Helper to save base64 image to content folder
async function saveImage(base64Data: string): Promise<string> {
    if (!base64Data || !base64Data.startsWith('data:image')) {
        return base64Data; // Already a URL or empty
    }

    const contentDir = path.join(process.cwd(), 'content');

    // Ensure content directory exists
    try {
        await fs.access(contentDir);
    } catch {
        await fs.mkdir(contentDir, { recursive: true });
    }

    // Extract extension and data
    const matches = base64Data.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }

    const extension = matches[1] === 'jpeg' ? 'jpg' : matches[1];
    const buffer = Buffer.from(matches[2], 'base64');

    // Unique filename
    const filename = `upload-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${extension}`;
    const filePath = path.join(contentDir, filename);

    await fs.writeFile(filePath, buffer);

    // Return the URL that will be served by our route handler
    return `/api/content/${filename}`;
}

export async function savePost(post: NewsPost): Promise<{ success: boolean; error?: string }> {
    await ensureDataDir();
    try {
        const posts = await getPosts();

        // Handle image saving
        if (post.imageUrl) {
            post.imageUrl = await saveImage(post.imageUrl);
        }
        if (post.imageUrl2) {
            post.imageUrl2 = await saveImage(post.imageUrl2);
        }

        const index = posts.findIndex((p) => p.id === post.id);

        if (index >= 0) {
            posts[index] = post;
        } else {
            posts.unshift(post); // Add new posts to the beginning
        }

        await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
        revalidatePath('/news');
        revalidatePath('/');
        revalidatePath('/admin');
        return { success: true };
    } catch (error) {
        console.error('Failed to save post:', error);
        return { success: false, error: 'Failed to save post' };
    }
}

export async function deletePost(id: string): Promise<{ success: boolean; error?: string }> {
    await ensureDataDir();
    try {
        const posts = await getPosts();
        const newPosts = posts.filter((p) => p.id !== id);
        await fs.writeFile(POSTS_FILE, JSON.stringify(newPosts, null, 2));
        revalidatePath('/news');
        revalidatePath('/');
        revalidatePath('/admin');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete post:', error);
        return { success: false, error: 'Failed to delete post' };
    }
}

// --- PROGRAMS ---

export async function getPrograms(): Promise<Program[]> {
    await ensureDataDir();
    try {
        const data = await fs.readFile(PROGRAMS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

export async function savePrograms(programs: Program[]): Promise<{ success: boolean; error?: string }> {
    await ensureDataDir();
    try {
        await fs.writeFile(PROGRAMS_FILE, JSON.stringify(programs, null, 2));
        revalidatePath('/programs');
        revalidatePath('/admin');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to save programs:', error);
        return { success: false, error: 'Failed to save programs' };
    }
}
