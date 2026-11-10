/** @format */

import supabase from "./supabase";

export async function createRequest({
  title,
  description,
  budget,
  phone,
  company,
  user,
}) {
  const { data, error } = await supabase.from("requests").insert({
    project_title: title,
    project_description: description,
    budget,
    phone,
    company_name: company,
    contact_email: user?.email,
    client_id: user?.id,
    status: "pending",
  });

  return { data, error };
}

export async function updateRequest(requestId, updates) {
  const { data, error } = await supabase
    .from("requests")
    .update(updates)
    .eq("id", requestId);

  return { data, error };
}

export async function getRequests() {
  const { data, error } = await supabase
    .from("requests")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  return { data, error };
}

export async function deleteRequest(requestId) {
  const { error } = await supabase
    .from("requests")
    .delete()
    .eq("id", requestId);

  return { error };
}

export async function approveRequest(reqId) {
  // Atomic, server-side transaction: inserts the project, updates the
  // client profile, and marks the request approved in ONE Postgres call
  // (SECURITY DEFINER, admin-only). See supabase/migrations/004_approve_request.sql.
  const { data, error } = await supabase.rpc("approve_request", {
    p_request_id: reqId,
  });

  return { data, error };
}

export async function rejectRequest(reqId, reason) {
  const { error } = await supabase
    .from("requests")
    .update({
      status: "rejected",
      reject_reason: reason,
    })
    .eq("id", reqId);

  return { error };
}

export async function cancelRequest(requestId) {
  const { data, error } = await supabase
    .from("requests")
    .update({ status: "cancelled" })
    .eq("id", requestId);

  return { data, error };
}
