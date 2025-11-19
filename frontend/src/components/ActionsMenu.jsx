import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const ActionsMenu = ({ data, actions }) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} className="cursor-pointer px-2">...</DropdownMenuTrigger>

            <DropdownMenuContent className="text-neutral-50 bg-neutral-700 border-neutral-500">
                {actions.map((item, index) => {
                    return(
                        <DropdownMenuItem 
                        key={item.title}
                        onClick={(e) => {
                            e.stopPropagation();
                            item.action(data[index]);
                            }
                        }
                        className="cursor-pointer hover:bg-neutral-600"
                        >
                        {item.title}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
            
        </DropdownMenu>
    )
}

export default ActionsMenu;