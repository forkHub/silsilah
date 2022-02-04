export class RouterKOns {
	static readonly auth_login: string = "/api/auth/login";
	static readonly auth_logout: string = "/api/auth/logout";

	static readonly daftar_anggota: string = "/api/sm/anggota/daftar";	//get
	static readonly edit_anggota: string = "/api/sm/anggota/edit";		//patch	
	static readonly delete_anggota: string = "/api/sm/anggota/delete";	//patch	
	static readonly anggota_baru: string = "/api/sm/anggota/baru";		//patch	

	static readonly daftar_calon_pasangan: string = "/api/sm/pasangan/calon/daftar";
	static readonly daftar_pasangan: string = "/api/sm/pasangan/daftar";
	static readonly hapus_pasangan: string = "/api/sm/pasangan/daftar";
	static readonly edit_pasangan: string = "/api/sm/pasangan/edit";
	static readonly pasangan_baru: string = "/api/sm/pasangan/baru";

	static readonly daftar_calon_anak: string = "/api/sm/anak/calon/daftar";
	static readonly anak_baru: string = "/api/sm/anak/baru";
	static readonly anak_hapus: string = "/api/sm/anak/hapus";					//id_anak, id_anggota
	static readonly daftar_anak: string = "/api/sm/anak/daftar";

	static readonly daftar_calon_ortu: string = "/api/sm/ortu/calon/daftar";
	static readonly ortu_baru: string = "/api/sm/ortu/baru";
	static readonly ortu_hapus: string = "/api/sm/ortu/hapus";					//id_anak, id_anggota
	static readonly daftar_ortu: string = "/api/sm/ortu/daftar";
}