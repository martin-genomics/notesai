import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

const { getUser } = getKindeServerSession();


export async function POST(req: NextRequest) {
    try {

        const user = await getUser();

        const body = await req.json()
        await prisma.label.create({
            data: {
                userId: user?.id,
                name: body.label
            }
        })

        await prisma.$disconnect()

        return NextResponse.json({
            success: true,
            message: "Label has been created!"
        }, { status: 201 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "",
            data: {

            }
        }, { status: 500 })
    }
}



export async function GET(req: NextRequest) {
    try {

        console.log(req.url)

        const user = await getUser();

        const labels = await prisma.label.findMany({
            where: { userId: user.id }
        })

        await prisma.$disconnect()


        return NextResponse.json({
            success: true,
            message: "Label have been fetched!",
            data: {
                labels
            }
        }, { status: 200 })

    } catch (error) {

        console.log(error)
        return NextResponse.json({
            success: false,
            message: "",
            data: {

            }
        }, { status: 500 })
    }

}