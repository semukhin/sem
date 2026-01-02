import { notFound } from 'next/navigation';
import NewsPostClient from './NewsPostClient';
import styles from './page.module.css';

interface NewsPost {
    id: string;
    title: string;
    date: string;
    content: string;
    slug: string;
    imageUrl?: string;
    videoUrl?: string;
}

// Mock data as fallback
const mockPosts: Record<string, NewsPost> = {
    'welcome-to-sem': {
        id: '1',
        title: 'Welcome to Slavic Emigrants Ministry',
        date: 'December 20, 2024',
        slug: 'welcome-to-sem',
        content: `
      <p>We are excited to announce the launch of our new website. Our mission is to help Slavic emigrants integrate into life in the United States.</p>
      
      <p>This new platform will serve as a central hub for our community, providing:</p>
      
      <ul>
        <li>Latest news and updates about our programs</li>
        <li>Resources for newly arrived families</li>
        <li>Information about our services and how to access them</li>
        <li>Ways to get involved and support our mission</li>
      </ul>
      
      <p>We invite you to explore the site and learn more about how we can help you or how you can help us make a difference in the lives of Slavic emigrants.</p>
      
      <p>Thank you for being part of our community!</p>
    `,
    },
    'new-programs-2025': {
        id: '2',
        title: 'New Programs for 2025',
        date: 'December 15, 2024',
        slug: 'new-programs-2025',
        content: `
      <p>We are introducing several new programs to better serve our community, including expanded legal aid and employment assistance.</p>
      
      <h3>Expanded Legal Aid</h3>
      <p>Our legal aid program will now offer weekly consultations with immigration attorneys, helping more families navigate the complex immigration system.</p>
      
      <h3>Employment Assistance</h3>
      <p>We're partnering with local employers to create job placement opportunities specifically for our community members.</p>
      
      <p>Stay tuned for more details about these exciting new initiatives!</p>
    `,
    },
    'community-gathering-success': {
        id: '3',
        title: 'Community Gathering Success',
        date: 'December 10, 2024',
        slug: 'community-gathering-success',
        content: `
      <p>Our recent community gathering brought together over 100 families. Thank you to all who participated and made it a memorable event.</p>
      
      <p>The event featured:</p>
      <ul>
        <li>Traditional food and music</li>
        <li>Children's activities</li>
        <li>Information sessions about our services</li>
        <li>Networking opportunities</li>
      </ul>
      
      <p>We look forward to hosting more events like this in the future!</p>
    `,
    },
};

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return <NewsPostClient slug={slug} mockPosts={mockPosts} />;
}
