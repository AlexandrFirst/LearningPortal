import React from 'react'
import styles from './fileUploadForm.module.scss'

import { CircularProgress, Grid, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import { FileUploadDragAndDrop } from 'components/file-upload/FileUploadDragAndDrop'
import { Input } from 'components/input/Input'

import { AttachmentIcon } from '../attachment-icon/AttachmentIcon'
import { useModalContext } from '../modal-context/ModalContext'
import { LinkType } from 'api/tab-api/tab.api.types'

interface FileUploadFormProps {
  file: File | null
  isLoading: boolean
  accept: string
  currentType: LinkType
  onFileAdded?: (file: File | null) => void
  onDelete?: () => void
}

export const FileUploadForm: React.FC<FileUploadFormProps> = ({ onFileAdded, accept, file, currentType, isLoading, onDelete }) => {
  const { modalData } = useModalContext()

  const handleFileAdded = (file: File | null) => {
    onFileAdded?.(file)
  }

  if (isLoading) {
    return (
      <Grid item xs={12} className={styles.loading}>
        <CircularProgress />
      </Grid>
    )
  }

  const isTypeMatch = modalData?.contentType === currentType

  return (
    <Grid className={styles.container}>
      {!file ? (
        <>
          <FileUploadDragAndDrop accept={accept} onFileAdded={handleFileAdded} />
          <Grid sx={{ pt: 2 }}>
            <Typography>або</Typography>
            <Input name={'fileLabel'} placeholder={"Додайте назву файлу (Необов'язково)"} variant={'standard'} defaultValue={isTypeMatch ? modalData?.description : undefined} />
            <Input
              name={'fileLink'}
              placeholder={'Додайте посилання. Наприклад, https://file.com'}
              variant={'standard'}
              className={styles.input}
              defaultValue={isTypeMatch ? modalData?.content : undefined}
              required
            />
          </Grid>
        </>
      ) : (
        <Grid container alignItems={'center'} className={styles.fileContainer}>
          <AttachmentIcon type={currentType} />
          <Typography>{file.name}</Typography>
          <IconButton onClick={onDelete}>
            <DeleteIcon color='error' />
          </IconButton>
        </Grid>
      )}
    </Grid>
  )
}
