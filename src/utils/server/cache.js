'use server';
import { revalidatePath } from 'next/cache';

export const updateServerCache = async (id) => {
  revalidatePath(`/users/${ id }`);
  //revalidateTag('user');
};