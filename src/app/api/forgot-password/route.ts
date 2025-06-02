import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetTokenExpires = new Date(Date.now() + 600000); // 10 mins from now

    await prisma.user.update({
      where: { email },
      data: {
        passwordResetToken: resetTokenHash,
        passwordResetExpires: resetTokenExpires,
      },
    });

    // TODO: Send reset link via email (e.g., using a mail service like SendGrid or Nodemailer)
    // For now, we'll just log the reset token
    console.log(`Password reset token: ${resetToken}`);

    return NextResponse.json({ message: 'Password reset link sent to your email' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to process forgot password request' }, { status: 500 });
  }
}
