import Driver from '#models/driver'
import { drivers } from '@adonisjs/core/hash'
import type { HttpContext } from '@adonisjs/core/http'

export default class DriversController {
    async store({request,response}:HttpContext){
        const data  = request.only([ 'user_id', 'license_no', 'is_available' ])

        await Driver.create({
              
            ...data
        })

        return response.json({
            "message":"Driver Created successfully",
             data,
        })
   
    }
}