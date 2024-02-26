import React, { useState } from 'react'
import { tokens } from '../theme';
import { 
  Box, 
  Button, 
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
  Typography, } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import CloseIcon from '@mui/icons-material/Close';

const DialogRequest = ({ title, children, openDialog, request, setOpenDialog }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const date = new Date(request.Created);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  console.log(date.getFullYear());
  return (
    <>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth='md'
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            setOpenDialog(false);
          },
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
        >
          <DialogTitle>
            <Typography variant="h4" color="#F49246">
              {title}
            </Typography>
          </DialogTitle>
          <Button 
            onClick={() => setOpenDialog(false)}
            sx={{
              "&:hover" :{
                background: `${theme.palette.error.main} !important`
              },
              borderRadius: "0",
              p: 0,
              // m: 0.5,
            }}
          >
           {/* <CancelPresentationIcon /> */}
            <CloseIcon />
          </Button>
        </Box>
        
        <Box
          display="flex"
          flexDirection="row"
        >
        {/* <Box> */}
          <DialogContent dividers>
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection="row"
            >
              <Box
                display="flex"
                flexDirection="row"
                
              >
              <Box
                display="flex"
                flexDirection="column"
                align="right"
                sx={{
                  p: 1,
                }}
              >
                <Typography variant="h5">
                  Name:
                </Typography>
                <Typography variant="h5">
                  Office:
                </Typography>
                <Typography variant="h5">
                  Email:
                </Typography>
                <Typography variant="h5">
                  Date:
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                sx={{
                  p: 1,
                }}
              >
                <Typography variant="h5">
                  {request.Name}
                </Typography>
                <Typography variant="h5">
                  {request.Office}
                </Typography>
                <Typography variant="h5">
                  {request.Email}
                </Typography>
                <Typography variant="h5">
                  {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
                </Typography>
              </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                
              >
              <Box
                display="flex"
                flexDirection="column"
                align="right"
                sx={{
                  p: 1,
                }}
              >
                <Typography variant="h5"
                  sx={{
                    m: '0.25rem',
                  }}
                >
                  Approver:
                </Typography>
                <Typography variant="h5"
                  sx={{
                    m: '0.25rem',
                  }}
                >
                  CUD Type:
                </Typography>
                <Typography variant="h5"
                  sx={{
                    m: '0.25rem',
                  }}
                >
                  Status:
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                sx={{
                  p: 1,
                }}
              >
                <Typography variant="h5"
                  sx={{
                    m: '0.25rem',
                  }}
                >
                  Not Available
                </Typography>
                <Typography variant="h5"
                  sx={(theme) => ({
                    backgroundColor:
                      request.CUD === "Create"
                        ? theme.palette.info.dark
                        : request.CUD === "Update"
                          ? theme.palette.success.dark
                          : theme.palette.error.dark,
                    borderRadius: '0.25rem',
                    color: '#fff',
                    width: '75px',
                    textAlign: 'center',
                    p: '0.15rem',
                    m: '0.15rem',
                  })}
                >
                  {request.CUD}
                </Typography>
                <Typography variant="h5"
                  sx={(theme) => ({
                    backgroundColor:
                    request.Status === "Pending"
                        ? theme.palette.warning.dark
                        : request.Status === "Approved"
                          ? theme.palette.success.dark
                          : theme.palette.error.dark,
                    borderRadius: '0.25rem',
                    color: '#fff',
                    width: '75px',
                    textAlign: 'center',
                    p: '0.15rem',
                    m: '0.15rem',
                  })}
                >
                  {request.Status}
                </Typography>
              </Box>
              </Box>
            </Box>
            <Box
              display="grid"
              columnGap="10px"
              gridTemplateColumns="repeat(6, minmax(0, 1fr))"
            >
            <TextField
              // autoFocus
              InputProps={{
                readOnly: true,
              }}
              margin="dense"
              type="text"
              // value=
              label="Term"
              defaultValue={request.Term}
              variant="filled"
              multiline
              sx={{ gridColumn: "span 6" }}
            />
            <TextField
              // autoFocus
              InputProps={{
                readOnly: true,
              }}
              margin="dense"
              type="text"
              // value=
              label="Acronym"
              defaultValue={request.Acronym}
              variant="filled"
              multiline
              sx={{ gridColumn: "span 3" }}
            />
            <TextField
              // autoFocus
              InputProps={{
                readOnly: true,
              }}
              margin="dense"
              type="text"
              // value=
              label="Additional"
              defaultValue={request.Additional}
              variant="filled"
              multiline
              sx={{ gridColumn: "span 3" }}
            />
            <TextField
              // autoFocus
              InputProps={{
                readOnly: true,
              }}
              margin="dense"
              type="text"
              // value=
              label="Definition"
              defaultValue={request.Definition}
              variant="filled"
              multiline
              sx={{ gridColumn: "span 6" }}
            />
            <TextField
              // autoFocus
              InputProps={{
                readOnly: true,
              }}
              margin="dense"
              type="text"
              // value=
              label="Document Title"
              defaultValue={request.DocuTitle}
              variant="filled"
              multiline
              sx={{ gridColumn: "span 6" }}
            />
            <TextField
              // autoFocus
              InputProps={{
                readOnly: true,
              }}
              margin="dense"
              type="text"
              // value=
              label="Document Code"
              defaultValue={request.DocuCode}
              variant="filled"
              multiline
              sx={{ gridColumn: "span 3" }}
            />
            <TextField
              // autoFocus
              InputProps={{
                readOnly: true,
              }}
              margin="dense"
              type="text"
              // value=
              label="Document Link"
              defaultValue={request.DocuLink}
              variant="filled"
              multiline
              sx={{ gridColumn: "span 3" }}
            />
            <Typography
              // autoFocus
              // InputProps={{
              //   readOnly: true,
              // }}
              margin="dense"
              type="text"
              // value=
              label="Note"
              // variant="filled"
              // multiline
              sx={{
                gridColumn: "span 6",
                p: 0,
                mx: 1,
                mb: 1,
             }}
             variant="h4"
            >
              User's Note: {request.Note}
            </Typography>
            </Box>
          </DialogContent>
        {/* </Box> */}
        {/* <Box
          display="flex"
          alignItems="center"
        >
          <EastIcon />
        </Box> */}
        {/* <Box> */}
          {/* <DialogContent dividers>
            <DialogContentText>
              Future Request Description
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent> */}
        {/* </Box> */}
        </Box>
      </Dialog>
    </>
  )
}

export default DialogRequest;
