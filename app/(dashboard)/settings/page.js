"use client";

import { useState } from "react";
import { users } from "@/data/mockData";

const settingsSections = ["General", "Security", "Users", "Templates", "Ai Integration", "Invoice Templates"];

function SettingsNav({ active, setActive }) {
  return (
    <div className="w-[220px] shrink-0 rounded-xl overflow-hidden" style={{ backgroundColor: "#1a1a1a", border: "1px solid #252525" }}>
      {settingsSections.map((s, i) => (
        <button key={s} onClick={() => setActive(s)}
          className="w-full text-left px-4 py-3 text-sm transition-colors"
          style={{
            borderBottom: i < settingsSections.length - 1 ? "1px solid #1e1e1e" : "none",
            backgroundColor: active === s ? "#1e1e1e" : "transparent",
            color: active === s ? "#fff" : "#666",
          }}>
          {s}
        </button>
      ))}
    </div>
  );
}

function Field({ label, type = "text", placeholder = "" }) {
  return (
    <div>
      <label className="block text-xs mb-1.5" style={{ color: "#888" }}>{label}</label>
      <div className="relative">
        <input type={type} placeholder={placeholder} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: "#111", border: "1px solid #252525", color: "#fff" }} />
        {type === "password" && (
          <button className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#444" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

function ContentPanel({ title, subtitle, children }) {
  return (
    <div className="flex-1 rounded-xl overflow-hidden" style={{ backgroundColor: "#1a1a1a", border: "1px solid #252525" }}>
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #1e1e1e" }}>
        <div>
          <h2 className="text-sm font-semibold text-white">{title}</h2>
          <p className="text-xs mt-0.5" style={{ color: "#555" }}>{subtitle}</p>
        </div>
        <button className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: "#2563eb" }}>
          Save Changes
        </button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function ImageUploadItem({ label, description }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: "#111", border: "1px solid #252525" }}>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: "#1e1e1e", border: "1px solid #262626" }} />
        <div>
          <p className="text-sm font-medium text-white">{label}</p>
          <p className="text-xs mt-0.5" style={{ color: "#555" }}>{description}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="p-2 rounded-lg" style={{ backgroundColor: "#1a1a1a", border: "1px solid #262626", color: "#666" }}>
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button className="p-2 rounded-lg" style={{ backgroundColor: "#1a1a1a", border: "1px solid #262626", color: "#666" }}>
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [active, setActive] = useState("General");

  return (
    <div>
      <h1 className="text-xl font-bold text-white mb-6">Settings</h1>
      <div className="flex gap-5">
        <SettingsNav active={active} setActive={setActive} />

        {active === "General" && (
          <ContentPanel title="General" subtitle="Basic user info can be managed from here.">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-white mb-3">Profile Picture</p>
                <div className="h-px mb-5" style={{ backgroundColor: "#1e1e1e" }} />
                <ImageUploadItem label="Profile Picture" description="This picture will be appear publicly on the platform" />
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-3">General Information</p>
                <div className="h-px mb-5" style={{ backgroundColor: "#1e1e1e" }} />
                <div className="space-y-4">
                  <Field label="Name" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Email" />
                    <Field label="Phone Number" />
                  </div>
                </div>
              </div>
            </div>
          </ContentPanel>
        )}

        {active === "Security" && (
          <ContentPanel title="Security" subtitle="You can update your password and pin from here.">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-white mb-3">Password</p>
                <div className="h-px mb-5" style={{ backgroundColor: "#1e1e1e" }} />
                <div className="space-y-4">
                  <div className="flex gap-4 items-end">
                    <div className="flex-1"><Field label="Current Password" type="password" /></div>
                    <button className="text-sm font-medium mb-0.5" style={{ color: "#2563eb", whiteSpace: "nowrap" }}>Forget Password</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="New Password" type="password" />
                    <Field label="Confirm Password" type="password" />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-3">Pin</p>
                <div className="h-px mb-5" style={{ backgroundColor: "#1e1e1e" }} />
                <div className="space-y-4">
                  <div className="flex gap-4 items-end">
                    <div className="flex-1"><Field label="Pin" type="password" /></div>
                    <button className="text-sm font-medium mb-0.5" style={{ color: "#2563eb", whiteSpace: "nowrap" }}>Forget Pin</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="New Pin" type="password" />
                    <Field label="Confirm Pin" type="password" />
                  </div>
                </div>
              </div>
            </div>
          </ContentPanel>
        )}

        {active === "Users" && (
          <ContentPanel title="Users" subtitle="You can create different users of the system from here">
            <div>
              <div className="flex justify-end gap-3 mb-4">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#666" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input className="pl-9 pr-3 py-2 rounded-lg text-sm outline-none placeholder-gray-600 w-48" style={{ backgroundColor: "#111", border: "1px solid #252525", color: "#fff" }} placeholder="Find Company" />
                </div>
                <button className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: "#2563eb" }}>Create User</button>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid #1e1e1e" }}>
                    {["Name", "Email", "Phone", "Type", "Actions"].map(h => (
                      <th key={h} className="text-left py-2 pr-4 text-xs font-medium" style={{ color: "#3a3a3a" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #161616" }}>
                      <td className="py-3 pr-4 text-xs text-white">{u.name}</td>
                      <td className="py-3 pr-4 text-xs" style={{ color: "#888" }}>{u.email}</td>
                      <td className="py-3 pr-4 text-xs" style={{ color: "#888" }}>{u.phone}</td>
                      <td className="py-3 pr-4 text-xs" style={{ color: "#888" }}>{u.type}</td>
                      <td className="py-3">
                        <div className="flex gap-1">
                          <button className="p-1.5 rounded-lg" style={{ backgroundColor: "#111", border: "1px solid #252525", color: "#666" }}>
                            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button className="p-1.5 rounded-lg" style={{ backgroundColor: "#111", border: "1px solid #252525", color: "#666" }}>
                            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between pt-4 mt-2" style={{ borderTop: "1px solid #1e1e1e" }}>
                <span className="text-xs" style={{ color: "#555" }}>Showing 7 of 62 orders</span>
                <div className="flex gap-1">
                  <button className="flex items-center gap-1 text-xs px-3 py-1 rounded" style={{ color: "#888", backgroundColor: "#111", border: "1px solid #252525" }}>â€¹ Prev</button>
                  <button className="flex items-center gap-1 text-xs px-3 py-1 rounded" style={{ color: "#888", backgroundColor: "#111", border: "1px solid #252525" }}>Next â€º</button>
                </div>
              </div>
            </div>
          </ContentPanel>
        )}

        {active === "Ai Integration" && (
          <ContentPanel title="Ai Integration" subtitle="Your open-ai integration details are here.">
            <div className="space-y-4 max-w-lg">
              <Field label="Secret Key" type="password" />
              <Field label="Api Key" type="password" />
            </div>
          </ContentPanel>
        )}

        {active === "Invoice Templates" && (
          <ContentPanel title="Invoice Template" subtitle="Your invoice header and footer can be updated from here.">
            <div className="space-y-6">
              {[
                { section: "Taxes", items: [{ l: "Header", d: "This picture will appear on top of your tax based invoices." }, { l: "Footer", d: "This picture will appear on bottom of your tax based invoices." }] },
                { section: "SMEs", items: [{ l: "Header", d: "This picture will appear on top of your invoices." }, { l: "Footer", d: "This picture will appear on bottom of your invoices." }] },
              ].map(({ section, items }) => (
                <div key={section}>
                  <p className="text-sm font-medium text-white mb-2">{section}</p>
                  <div className="h-px mb-4" style={{ backgroundColor: "#1e1e1e" }} />
                  <div className="space-y-3">
                    {items.map(({ l, d }) => <ImageUploadItem key={l} label={l} description={d} />)}
                  </div>
                </div>
              ))}
            </div>
          </ContentPanel>
        )}

        {(active === "Templates") && (
          <ContentPanel title="Templates" subtitle="Manage your templates here.">
            <p className="text-sm" style={{ color: "#555" }}>No templates configured.</p>
          </ContentPanel>
        )}
      </div>
    </div>
  );
}





