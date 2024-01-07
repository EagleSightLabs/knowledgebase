// pages/api/posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'blog');

export default function handler(req, res) {
    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames.map(fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        return {
            slug,
            ...data,
            content,
        };
    });
    res.status(200).json(posts);
}
