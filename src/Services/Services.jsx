import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';


export const supabase = createClient(import.meta.env.VITE_DATABASE_PROJECT_URL, import.meta.env.VITE_DATABASE_KEY);
export default class Services {
	constructor() {
		this.prisma = new PrismaClient();
		this.supabase =  createClient(import.meta.env.VITE_DATABASE_PROJECT_URL, import.meta.env.VITE_DATABASE_KEY);
	}
	async getAuthStateChange(navigate) {
		try {
			this.supabase.auth.onAuthStateChange(async (e) => {
				console.log(e);
				if (e === 'SIGNED_IN') {
					//farward to success url
					navigate('/');
				} else {
					//forward to login page
					navigate('/login');
				}
			});
		} catch (error) {
			console.log('Error : getAuthStateChane - ', error);
		}
	}
	async register({ email, password, name }) {
		try {
			const { data, error } = await this.supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						display_name: name,
					},
				},
			});
			if (error) {
				console.error('Error encountered while registering User : ', error);
			}
			return data;
		} catch (error) {
			console.log('Error exception: SignUp - ', error);
		}
	}
	async signin({ email, password }) {
		try {
			const { data, error } = await this.supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (error) console.error('Error encountered while SignIn:', error);
			return data;
		} catch (error) {
			console.log('Error exception: SignIn - ', error);
		}
	}
	async signout(navigate) {
		try {
			const { error } = await this.supabase.auth.signOut();
			if (error) console.error('Error encountered while signing out : ', error);
			navigate('/login');
		} catch (error) {
			console.log('Error Exception: SignOut - ', error);
		}
	}
	async getSession() {
		try {
			const { session, error } = await this.supabase.auth.getSession();
			if (error) console.error('Error encountered while getting session : ', error);
			if (session) {
				return session;
			}
		} catch (error) {
			console.log('Error exception : getSession - ', error);
		}
	}
	async setSession(session) {
		try {
			await this.supabase.auth.setSession(session);
		} catch (error) {
			console.log('Error exception: setSession - ', error);
		}
	}
	async getUser() {
		try {
			const data = this.supabase.auth.getUser();
			if (data?.user) {
				return data;
			}
			return false;
		} catch (error) {
			console.log('Error exception : getUser - ', error);
		}
	}
}
