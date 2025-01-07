import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

type Transaction = {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  bvn: string;
  timestamp: string;
}

type UpdateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
  onUpdate: (transaction: Transaction) => void;
}

export function UpdateModal({ isOpen, onClose, transaction, onUpdate }: UpdateModalProps) {
  const [updatedTransaction, setUpdatedTransaction] = useState(transaction)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdatedTransaction({ ...updatedTransaction, [name]: value })
  }

  const handleGenderChange = (value: string) => {
    setUpdatedTransaction({ ...updatedTransaction, gender: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(updatedTransaction)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={updatedTransaction.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={updatedTransaction.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={updatedTransaction.phone}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <Select
                onValueChange={handleGenderChange}
                defaultValue={updatedTransaction.gender}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bvn" className="text-right">
                BVN
              </Label>
              <Input
                id="bvn"
                name="bvn"
                value={updatedTransaction.bvn}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div> */}
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
