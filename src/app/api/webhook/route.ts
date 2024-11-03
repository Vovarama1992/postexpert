import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
    try {
        const { locale, path } = await request.json();

        switch (path) {
            case "/":
                revalidatePath(`/${locale}`);
                break;
            case "/statuses":
                revalidatePath(`/${locale}/dashboard`, "layout");
                break;
            case "/all":
                revalidatePath('/', 'layout');
                break;
            default:
                revalidatePath(`/${locale}${path}`);
                break;
        }

        const response = NextResponse.json({ success: true, message: `Cache revalidated for ${path}` });
        response.headers.set('Cache-Control', 'no-store, max-age=0');
        return response;
    } catch (error) {
        console.error('Ошибка при обработке вебхука:', error);
        const response = NextResponse.json({ success: false, message: 'Error processing webhook' }, { status: 500 });
        response.headers.set('Cache-Control', 'no-store, max-age=0');
        return response;
    }
}
