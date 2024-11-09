import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const { isAuthenticated } = getKindeServerSession();
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    
    const isUserAuthenticated = await isAuthenticated();
    if (isUserAuthenticated) {

        // Allow access to other routes if authenticated
        return NextResponse.next();
    }



    return NextResponse.redirect(new URL("/", request.url));

}


// List of authenticated routes

export const config = {
    matcher: [
        "/dashboard",
    ],

}
