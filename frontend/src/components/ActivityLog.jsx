
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
            <div className="rounded-xl overflow-hidden shadow border-neutral-700 border-1">
                <h1 className="w-full flex flex-col justify-center items-center bg-neutral-800 text-neutral-100 pt-4">Recent activity</h1>
                <Table className="min-w-full bg-neutral-700 text-neutral-100 border-neutral-700">
                    <TableHeader className="bg-neutral-800">
                        <TableRow>
                        <TableHead className="">Timestamp</TableHead>
                        <TableHead>Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-xs">
                        {recentActivity ? recentActivity.slice(0, 10).map((row) => (
                            <TableRow key={row.createdAt}
                            className="border-neutral-500 even:bg-neutral-800">

                                <TableCell className="">{formatDate(row.createdAt)}</TableCell>
                                <TableCell>{row.details}</TableCell>
                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default ActivityLog;