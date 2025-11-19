import { SlashIcon } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default function Breadcrumbs( { view, setView, selectedWarehouse } ) {
    return (
        <Breadcrumb className="text-neutral-300">
        <BreadcrumbList>
            <BreadcrumbItem>
                    <p onClick={() => setView("warehouses")} className="cursor-pointer hover:text-neutral-100">Warehouses</p>
            </BreadcrumbItem>

            {view === "inventory" || view === "products" ? 
                <>
                    <BreadcrumbSeparator>
                        <SlashIcon />
                    </BreadcrumbSeparator>

                    <BreadcrumbItem>
                            <p onClick={() => setView("inventory")} className="cursor-pointer hover:text-neutral-100">
                                {`Inventory (${selectedWarehouse.name})`}
                            </p>
                    </BreadcrumbItem> 
                </>
             : null }

            {view === "products" ? 
                <>
                <BreadcrumbSeparator>
                    <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <p onClick={() => setView("products")} className="cursor-pointer hover:text-neutral-100">Products</p>
                </BreadcrumbItem>
            </>
            : null }
            
        </BreadcrumbList>
        </Breadcrumb>
    )
}