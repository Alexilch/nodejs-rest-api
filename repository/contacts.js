const Contact = require('../models/contacts')


const listContacts = async (query, user) => {
  const result = await  Contact.find({ owner: user._id }).populate({
    path: 'owner',
    select: 'name email subscription',
  }) 
  return result
}

const getContactById = async (contactId, user) => {
  const result = await Contact.findOne({ _id: contactId, owner: user._id })
  .populate({
    path: 'owner',
    select: 'name email subscription',
  }) 
  return result
}

const removeContact = async (contactId, user) => {
  const result = await Contact.findOneAndRemove({ _id: contactId, owner: user._id })
  return result
}

const addContact = async (body, user) => {
  const result = await Contact.create({...body, owner: user._id})
  return result
}

const updateContact = async (contactId, body, user) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: user._id },
    { ...body },
    { new: true },
  )
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
