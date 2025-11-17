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
            <DropdownMenuTrigger>...</DropdownMenuTrigger>

            <DropdownMenuContent className="text-neutral-50 bg-neutral-700">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-neutral-500" />
                {actions.map((item, index) => {
                    return(
                        <DropdownMenuItem 
                        key={item.title + data[index]}
                        onClick={() => item.action(data[index])}
                        className="cursor-pointer"
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