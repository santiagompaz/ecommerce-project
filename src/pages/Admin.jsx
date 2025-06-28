import React, { useState } from 'react'

export const Admin = () => {

  const [products, setProducts] = useState({})
  const [form, setForm] = useState({id: null, name:'', price:''})
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  return (
    <div>
        <h1>Admin</h1>
    </div>
  )
}
