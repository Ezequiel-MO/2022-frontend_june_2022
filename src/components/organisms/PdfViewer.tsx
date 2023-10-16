import React, { useState } from 'react'
import { Document, Page } from 'react-pdf'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'

interface Props {
  pdfMenus: string[]
}

export const PdfViewer: React.FC<Props> = ({ pdfMenus }) => {
  const [showModal, setShowModal] = useState(false)
  const [numPages, setNumPages] = useState<number | null>(null)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  if (pdfMenus.length === 0) {
    return null
  }

  return (
    <>
      <Button
        variant='contained'
        color='warning'
        onClick={() => setShowModal(true)}
      >
        Visualize Sample Menus
      </Button>
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogContent>
          <Document file={pdfMenus[0]} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages ? numPages : 0), (_, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
