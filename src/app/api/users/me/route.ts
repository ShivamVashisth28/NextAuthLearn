import {connect} from '@/dbConfig/dbConfig'
import User from '@/model/userModel'
import { NextRequest, NextResponse } from 'next/server'
import { getDataFromToken } from '@/helpers/getDataFromToken'

connect()

export async function POST(request:NextRequest){
   
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id: userId}).select('-password')

        // check if there is no user

        return NextResponse.json({
            message: "User found",
            data: user
        })
}