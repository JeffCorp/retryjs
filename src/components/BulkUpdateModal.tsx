'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { BulkUpdateForm } from './BulkUpdateForm'

type BulkUpdateData = {
  email: string;
  phone: string;
  gender: string;
  bvn: string;
}

type BulkUpdateModalProps = {
  onUpdate: (data: BulkUpdateData) => void;
}

export function BulkUpdateModal({ onUpdate }: BulkUpdateModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleUpdate = (data: BulkUpdateData) => {
    onUpdate(data)
    setIsOpen(false)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Configure Missing Parameters
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Configure Missing Parameters</DialogTitle>
            <DialogDescription>
              Set default values for missing fields in failed transactions
            </DialogDescription>
          </DialogHeader>
          <BulkUpdateForm onUpdate={handleUpdate} />
        </DialogContent>
      </Dialog>
    </>
  )
} 