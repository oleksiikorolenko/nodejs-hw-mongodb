
import { ContactsCollection } from "../db/models/contacts.js";

export const getAllContacts = async ({page, perPage}) => {
  const skip =  page > 0 ? (page - 1) * perPage : 0;


  const [contacts, total] = await Promise.all([
    ContactsCollection.find().skip(skip).limit(perPage),
    ContactsCollection.countDocuments(),
  ]);


   const totalPages = Math.ceil(total / perPage);


  return {
    data: contacts,
    page,
    perPage,
    total,
    totalPages,
    hasNextPage: totalPages > page,
    hasPreviousPage: page > 1,
  };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};


export const updateContact = async (contactId, payload, options = {}) => {
 const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};


