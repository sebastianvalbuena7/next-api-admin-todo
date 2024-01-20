'use server';

import { getUserServerSession } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = async (seconds: number = 0) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, seconds * 1000);
    });
}

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {
    await sleep(3);

    const todo = await prisma.todo.findFirst({
        where: { id }
    });

    if (!todo) throw `Todo con id ${id} no encontrado`;

    const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { complete }
    });

    revalidatePath('/dashboard/server-todos');

    return updatedTodo;
}

export const addTodo = async (description: string) => {
    const session = await getUserServerSession();
    try {
        const todo = await prisma.todo.create({
            data: {
                userId: session?.id!,
                description
            }
        });

        revalidatePath('/dashboard/server-todos');

        return todo;
    } catch (error) {
        return {
            message: 'Error creando todo'
        }
    }
}

export const deleteTodosCompleted = async (): Promise<void> => {
    const session = await getUserServerSession();
    try {
        await prisma.todo.deleteMany({
            where: {
                complete: true,
                userId: session?.id
            }
        });
        revalidatePath('/dashboard/server-todos');
    } catch (error) {
        console.log(error);
    }
}