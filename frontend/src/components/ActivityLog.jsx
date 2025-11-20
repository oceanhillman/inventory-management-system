
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const ActivityLog = ({ recentActivity }) => {

    const formatDate = (timestamp) => {
        return String(new Date(timestamp).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        }));
    }

    return (
        <>
            <h1 className="w-full flex flex-col justify-center items-center bg-neutral-800 text-neutral-100 pt-4 rounded-t-xl">Recent activity</h1>
            <Table className="min-w-full bg-neutral-700 text-neutral-100 rounded-b-xl">
                <TableHeader className="bg-neutral-800">
                    <TableRow>
                    <TableHead className="">Timestamp</TableHead>
                    <TableHead>Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-xs">
                    {recentActivity ? recentActivity.slice(0, 10).map((row) => (
                        <TableRow key={row.id} onClick={() => addInventory(row)} 
                        className="hover:bg-neutral-600 cursor-pointer border-neutral-500">

                            <TableCell className="">{formatDate(row.createdAt)}</TableCell>
                            <TableCell>{row.details}</TableCell>
                        </TableRow>
                    )) : null}
                </TableBody>
            </Table>
        </>
    )
}

export default ActivityLog;