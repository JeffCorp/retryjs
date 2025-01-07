'use client'

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

type BulkUpdateData = {
  email: string;
  phone: string;
  gender: string;
  bvn?: string;
}

type BulkUpdateFormProps = {
  onUpdate: (data: BulkUpdateData) => void;
}

export function BulkUpdateForm({ onUpdate }: BulkUpdateFormProps) {
  const [bulkData, setBulkData] = useState<BulkUpdateData>({
    email: '',
    phone: '',
    gender: '',
    // bvn: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBulkData(prev => ({ ...prev, [name]: value }))
  }

  const handleGenderChange = (value: string) => {
    setBulkData(prev => ({ ...prev, gender: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(bulkData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="bulkEmail" className="text-right">
            Email
          </Label>
          <Input
            id="bulkEmail"
            name="email"
            value={bulkData.email}
            onChange={handleInputChange}
            placeholder="dummy@example.com"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="bulkPhone" className="text-right">
            Phone
          </Label>
          <Input
            id="bulkPhone"
            name="phone"
            value={bulkData.phone}
            onChange={handleInputChange}
            placeholder="1234567890"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="bulkGender" className="text-right">
            Gender
          </Label>
          <Select
            onValueChange={handleGenderChange}
            value={bulkData.gender}
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
          <Label htmlFor="bulkBVN" className="text-right">
            BVN
          </Label>
          <Input
            id="bulkBVN"
            name="bvn"
            value={bulkData.bvn}
            onChange={handleInputChange}
            placeholder="1234567890"
            className="col-span-3"
          />
        </div> */}
      </div>
      <div className="flex justify-end">
        <Button type="submit">Apply Updates</Button>
      </div>
    </form>
  )
}

