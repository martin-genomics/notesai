import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

const { getUser } = getKindeServerSession();


export async function PUT(req: NextRequest) {

    try {
        const user = await getUser();
        const body = await req.json()

        await prisma.note.update({
            where: {
                id: Number(body?.id),
                userId: user.id,
                isArchived: false
            },
            data: {
                title: body?.title,
                content: body?.content,
            }
        })

        await prisma.$disconnect()




        return NextResponse.json({
            success: true,
            message: "Note has been updated",
            data: {

            }
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Failed to add a note.",
            data: {

            }
        }, { status: 500 })
    }
}



export async function GET(req: NextRequest) {
    try {

        const user = await getUser();
        const labelId = new URL(req.url).searchParams.get("label")


        const notes = await prisma.note.findMany({
            where: {
                userId: user.id,
                labelId: labelId ? Number(labelId) : null

            }
        })

        await prisma.$disconnect()


        return NextResponse.json({
            success: true,
            message: "Notes have been fetched!",
            data: {
                notes
            }
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Failed to fetch notes",
            data: {

            }
        }, { status: 500 })
    }

}



export async function DELETE(req: NextRequest) {

    try {
        const user = await getUser();
        const body = await req.json()

        await prisma.note.update({
            where: {
                id: Number(body?.id),
                userId: user.id,
            },
            data: {
                isDeleted: true
            }
        })

        await prisma.$disconnect()




        return NextResponse.json({
            success: true,
            message: "Note has been updated",
            data: {

            }
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Failed to add a note.",
            data: {

            }
        }, { status: 500 })
    }
}