'use client'

import { useState } from 'react'
import { FailedTransactionsTable } from './FailedTransactionsTable'
import { Button } from '@/components/ui/button'
import { UpdateModal } from './UpdateModal'
import { BulkUpdateModal } from './BulkUpdateModal'
import failedTransactions from '@/app/data/failedTransactions.json'

type Transaction = {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  bvn: string;
  timestamp: string;
  isModified?: boolean;
}

export function FailedTransactionsDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>(failedTransactions)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [modifiedRows, setModifiedRows] = useState<number[]>([])
  const [isRetrying, setIsRetrying] = useState(false)

  const handleBulkRetry = async () => {
    if (modifiedRows.length === 0) {
      alert('No modified transactions to retry')
      return
    }

    const confirmMessage = `Are you sure you want to retry ${modifiedRows.length} modified transactions?`
    if (window.confirm(confirmMessage)) {
      setIsRetrying(true)
      try {
        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Remove retried transactions from the list
        const remainingTransactions = transactions.filter(
          t => !modifiedRows.includes(t.id)
        )
        
        // Update state
        setTransactions(remainingTransactions)
        setModifiedRows([])
        
        // Show success message
        alert(`Successfully retried ${modifiedRows.length} transactions`)
      } catch (error) {
        console.error('Error retrying transactions:', error)
        alert('Failed to retry transactions. Please try again.')
      } finally {
        setIsRetrying(false)
      }
    }
  }

  const handleUpdate = (updatedTransaction: Transaction) => {
    setTransactions(transactions.map(t => 
      t.id === updatedTransaction.id ? { ...updatedTransaction, isModified: true } : t
    ))
    setModifiedRows(prev => [...new Set([...prev, updatedTransaction.id])])
    setIsUpdateModalOpen(false)
  }

  const openUpdateModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsUpdateModalOpen(true)
  }

  const handleBulkUpdate = (bulkData: { email: string; phone: string; gender: string; bvn: string }) => {
    const updatedTransactions = transactions.map(t => {
      const wasEmpty = !t.email || !t.phone || !t.gender || !t.bvn
      const newTransaction = {
        ...t,
        email: t.email || bulkData.email,
        phone: t.phone || bulkData.phone,
        gender: t.gender || bulkData.gender,
        bvn: t.bvn || bulkData.bvn,
      }
      // Mark as modified only if any field was actually updated
      const isModified = wasEmpty && (
        newTransaction.email !== t.email ||
        newTransaction.phone !== t.phone ||
        newTransaction.gender !== t.gender ||
        newTransaction.bvn !== t.bvn
      )
      return { ...newTransaction, isModified }
    })

    const newModifiedRows = updatedTransactions
      .filter(t => t.isModified)
      .map(t => t.id)

    setTransactions(updatedTransactions)
    setModifiedRows(prev => [...new Set([...prev, ...newModifiedRows])])
  }

  const modifiedCount = modifiedRows.length

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button 
            onClick={handleBulkRetry}
            disabled={modifiedCount === 0 || isRetrying}
          >
            {isRetrying ? 'Retrying...' : `Bulk Retry (${modifiedCount})`}
          </Button>
          {modifiedCount > 0 && (
            <span className="text-sm text-muted-foreground">
              {modifiedCount} transaction{modifiedCount !== 1 ? 's' : ''} modified
            </span>
          )}
        </div>
        <BulkUpdateModal onUpdate={handleBulkUpdate} />
      </div>
      <FailedTransactionsTable 
        transactions={transactions} 
        onUpdate={openUpdateModal}
        modifiedRows={modifiedRows}
      />
      {selectedTransaction && (
        <UpdateModal 
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          transaction={selectedTransaction}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  )
}
