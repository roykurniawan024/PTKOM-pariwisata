import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import GuestLayout from '@/layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { User } from 'lucide-react';

export default function RegisterUser({ token }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('registrasi.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Registrasi Wisatawan - Jelajah Lampung" />

            <div className="mb-4 bg-emerald-50 border border-emerald-200 p-3 rounded-lg flex items-center space-x-3">
                <User className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div className="text-xs text-emerald-800">
                    <span className="font-semibold">Token Sekali Pakai Aktif:</span> Pendaftaran Akun Wisatawan / Pengguna Umum.
                </div>
            </div>

            <form onSubmit={submit}>
                <input type="hidden" name="token" value={data.token} />

                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phone_number" value="Nomor WhatsApp / Telepon" />
                    <TextInput
                        id="phone_number"
                        type="text"
                        name="phone_number"
                        value={data.phone_number}
                        className="mt-1 block w-full"
                        placeholder="081234567890"
                        onChange={(e) => setData('phone_number', e.target.value)}
                    />
                    <InputError message={errors.phone_number} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Kata Sandi" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Konfirmasi Kata Sandi" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-6">
                    <Link
                        href={route('registrasi.select')}
                        className="text-xs text-gray-600 hover:text-gray-900 underline mr-4"
                    >
                        Kembali Pilih Tipe
                    </Link>

                    <PrimaryButton className="bg-emerald-600 hover:bg-emerald-700" disabled={processing}>
                        Daftar Sebagai Wisatawan
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}