
import { ContactsCollection } from "../db/models/contacts.js";

export const getAllContacts = async ({page, perPage, sortBy, sortOrder,filter}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;
  const contactsQuery = ContactsCollection.find();

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (filter.value) {
    contactsQuery.where('isFavourite').equals(filter.value);
  }

  const [contacts, total] = await Promise.all([
    contactsQuery.sort({ [sortBy]: sortOrder }).skip(skip).limit(perPage),
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
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


