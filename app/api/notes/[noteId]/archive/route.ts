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
            },
            data: {
                isArchived: true
            }
        })

        await prisma.$disconnect()




        return NextResponse.json({
            success: true,
            message: "Note has been archived!",
            data: {

            }
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Failed to add note to archive.",
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
                labelId: labelId ? Number(labelId) : null,
                isArchived: true,
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