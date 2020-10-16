import React, { useEffect, useState } from "react"
import {Table} from "antd"
import { SmdashboardService } from "../../service";


export const MaterialList: React.FC<any> = () => {

        const [materials, setMaterials]: [any[], (...args:any) => any]  = useState([]);
        useEffect(() => {
            SmdashboardService.fetchMaterials().then((ms) => {
                    setMaterials(ms)
            })
        }, [])
        console.log(materials)
        return (
                <div>
                   sfdghjjgfd
                </div>

        )
}