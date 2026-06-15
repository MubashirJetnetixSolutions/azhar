"use client";

import { useState } from "react";
import { emails } from "@/data/mockData";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";

const CARD = { backgroundColor: "#161616", border: "1px solid #222", borderRadius: "14px" };

export default function EmailsPage() {
  const [selectedEmail, setSelectedEmail] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 style={{ color: "#fff", fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em" }}>Email</h1>
        <SearchInput placeholder="Find Email" />
      </div>

      <div style={{ display: "flex", gap: "16px" }}>
        {/* Narrow list when email selected */}
        {selectedEmail && (
          <div style={{ ...CARD, width: "260px", flexShrink: 0, overflow: "hidden" }}>
            <div style={{ padding: "12px" }}>
              <div style={{ position: "relative" }}>
                <svg style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#444" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input placeholder="Find Email" style={{ width: "100%", paddingLeft: "30px", paddingRight: "10px", paddingTop: "7px", paddingBottom: "7px", backgroundColor: "#111", border: "1px solid #1e1e1e", borderRadius: "8px", color: "#fff", fontSize: "12px", outline: "none" }} />
              </div>
            </div>
            <div>
              {emails.map((e, i) => (
                <button key={i} onClick={() => setSelectedEmail(e)} style={{
                  width: "100%", textAlign: "left", padding: "12px 16px", display: "block",
                  borderBottom: "1px solid #1a1a1a", cursor: "pointer", background: "none", border: "none",
                  borderBottom: "1px solid #1a1a1a",
                  backgroundColor: selectedEmail === e ? "#1e1e1e" : "transparent",
                }}>
                  <p style={{ color: "#ddd", fontSize: "13px" }}>{e.sender}</p>
                  <p style={{ color: "#444", fontSize: "10px", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.time}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main content */}
        <div style={{ ...CARD, flex: 1, overflow: "hidden" }}>
          {!selectedEmail ? (
            <>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #1e1e1e" }}>
                      {["Sender","Email Address","Highlight","Date & Time"].map(h => (
                        <th key={h} style={{ textAlign: "left", padding: h === "Sender" ? "14px 14px 14px 20px" : "14px 14px 14px 0", color: "#3a3a3a", fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {emails.map((e, i) => (
                      <tr key={i} onClick={() => setSelectedEmail(e)} style={{ borderBottom: "1px solid #1a1a1a", cursor: "pointer" }}>
                        <td style={{ padding: "13px 14px 13px 20px", color: "#ddd", fontSize: "13px", fontWeight: 500, whiteSpace: "nowrap" }}>{e.sender}</td>
                        <td style={{ padding: "13px 14px 13px 0", color: "#666", fontSize: "12px", whiteSpace: "nowrap" }}>{e.email}</td>
                        <td style={{ padding: "13px 14px 13px 0", color: "#555", fontSize: "12px", maxWidth: "500px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.highlight}</td>
                        <td style={{ padding: "13px 20px 13px 0", color: "#555", fontSize: "12px", whiteSpace: "nowrap" }}>{e.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ padding: "12px 20px" }}>
                <Pagination />
              </div>
            </>
          ) : (
            <div style={{ padding: "24px" }}>
              {/* Email header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid #1e1e1e", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button onClick={() => setSelectedEmail(null)} style={{ color: "#666", background: "none", border: "none", cursor: "pointer", display: "flex" }}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                  <h2 style={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}>Check out my templates</h2>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: "#444", fontSize: "12px" }}>1-16 of 16</span>
                  <button style={{ color: "#666", background: "none", border: "none", cursor: "pointer" }}>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button style={{ color: "#666", background: "none", border: "none", cursor: "pointer" }}>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>

              {/* Sender + date */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <p style={{ color: "#ddd", fontSize: "13px", fontWeight: 500 }}>
                  Scarlytemplates <span style={{ color: "#555", fontWeight: 400, fontSize: "12px" }}>&lt;randomdesign@gmail.com&gt;</span>
                </p>
                <p style={{ color: "#444", fontSize: "12px", whiteSpace: "nowrap" }}>June 25, 2018, 3:26PM</p>
              </div>

              {/* Body */}
              <div style={{ color: "#aaa", fontSize: "13px", lineHeight: 1.8, marginBottom: "24px" }}>
                <p>Hello,</p>
                <p>This is the company we need data for please check the file and start working</p>
                <br />
                <p>Regards,</p>
              </div>

              {/* Attachment */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: "12px", backgroundColor: "#111", border: "1px solid #1e1e1e" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "8px", backgroundColor: "#1a1a1a", border: "1px solid #222", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#555" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ color: "#ddd", fontSize: "13px", fontWeight: 500 }}>Report name_T1.pdf</p>
                    <p style={{ color: "#444", fontSize: "11px", marginTop: "2px" }}>23.5MB</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button style={{ padding: "7px", borderRadius: "7px", backgroundColor: "#1a1a1a", border: "1px solid #222", color: "#555", cursor: "pointer" }}>
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                  <button style={{ padding: "7px", borderRadius: "7px", backgroundColor: "#1a1a1a", border: "1px solid #222", color: "#555", cursor: "pointer" }}>
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
