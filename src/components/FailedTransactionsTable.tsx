import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Transaction = {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  bvn: string;
  reason?: string;
  timestamp: string;
  isModified?: boolean;
}

type FailedTransactionsTableProps = {
  transactions: Transaction[];
  onUpdate: (transaction: Transaction) => void;
  modifiedRows: number[];
}

export function FailedTransactionsTable({ 
  transactions, 
  onUpdate,
  modifiedRows 
}: FailedTransactionsTableProps) {
  return (
    <div className="border rounded-md">
      <div className="max-h-[600px] overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>BVN</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="sticky right-0 bg-background">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => {
              const isModified = modifiedRows.includes(transaction.id)
              return (
                <TableRow 
                  key={transaction.id}
                  className={cn(
                    isModified && "bg-muted/50"
                  )}
                >
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell>{transaction.email || 'N/A'}</TableCell>
                  <TableCell>{transaction.phone || 'N/A'}</TableCell>
                  <TableCell>{transaction.gender || 'N/A'}</TableCell>
                  <TableCell>{transaction.bvn || 'N/A'}</TableCell>
                  <TableCell>{transaction.reason || 'N/A'}</TableCell>
                  <TableCell>{new Date(transaction.timestamp).toLocaleString()}</TableCell>
                  <TableCell className="sticky right-0 bg-background">
                    <Button 
                      onClick={() => onUpdate(transaction)}
                      variant={isModified ? "secondary" : "default"}
                    >
                      {isModified ? "Modified" : "Update"}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
