import { useSession } from "next-auth/react";
import Image from "next/image";

const HalamanEditor = () => {
  const { data: session } = useSession();

  return (
    <div style={{ padding: 24 }}>
      <h1>Halaman Editor</h1>
      <p>
        Halaman ini hanya bisa diakses oleh role <b>editor</b> (atau <b>admin</b>).
      </p>

      {session?.user ? (
        <div style={{ marginTop: 16 }}>
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt="Avatar"
              width={96}
              height={96}
              style={{ borderRadius: 9999 }}
            />
          ) : null}

          <div style={{ marginTop: 12 }}>
            <div>
              <b>Email:</b> {session.user.email}
            </div>
            <div>
              <b>Nama:</b> {(session.user as any).fullname}
            </div>
            <div>
              <b>Role:</b> {(session.user as any).role}
            </div>
            <div>
              <b>Provider:</b> {(session.user as any).type || "credentials"}
            </div>
          </div>
        </div>
      ) : (
        <p style={{ marginTop: 16 }}>Tidak ada session.</p>
      )}
    </div>
  );
};

export default HalamanEditor;
