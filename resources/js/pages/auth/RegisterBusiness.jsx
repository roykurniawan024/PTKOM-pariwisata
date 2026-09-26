import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import GuestLayout from '@/layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Store, Info } from 'lucide-react';

export default function RegisterBusiness({ token }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        name: '',
        email: '',
        phone_number: '',
        business_name: '',
        business_type: '',
        business_address: '',
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
            <Head title="Registrasi Mitra Usaha - Jelajah Lampung" />

            <div className="mb-4 bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-center space-x-3">
                <Store className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div className="text-xs text-amber-800">
                    <span className="font-semibold">Token Sekali Pakai Aktif:</span> Pendaftaran Akun Mitra / Pemilik Usaha.
                </div>
            </div>

            <div className="mb-6 bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-start space-x-3">
                <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-[10px] leading-relaxed text-blue-700">
                    Akun mitra memerlukan validasi manual oleh tim admin sebelum dapat mengelola konten. Pastikan data usaha yang Anda masukkan valid.
                </p>
            </div>

            <form onSubmit={submit}>
                <input type="hidden" name="token" value={data.token} />

                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <InputLabel htmlFor="name" value="Nama Pemilik" />
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

                    <div>
                        <InputLabel htmlFor="email" value="Email Bisnis" />
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

                    <div>
                        <InputLabel htmlFor="phone_number" value="Nomor WhatsApp Aktif" />
                        <TextInput
                            id="phone_number"
                            type="text"
                            name="phone_number"
                            value={data.phone_number}
                            className="mt-1 block w-full"
                            placeholder="081234567890"
                            onChange={(e) => setData('phone_number', e.target.value)}
                            required
                        />
                        <InputError message={errors.phone_number} className="mt-2" />
                    </div>

                    <div className="border-t border-gray-100 pt-4 mt-2">
                        <h3 className="text-sm font-bold text-gray-700 mb-3">Informasi Usaha</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <InputLabel htmlFor="business_name" value="Nama Usaha / Objek Wisata" />
                                <TextInput
                                    id="business_name"
                                    name="business_name"
                                    value={data.business_name}
                                    className="mt-1 block w-full"
                                    placeholder="Contoh: Warung Kopi Lampung"
                                    onChange={(e) => setData('business_name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.business_name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="business_type" value="Kategori Usaha" />
                                <select
                                    id="business_type"
                                    name="business_type"
                                    value={data.business_type}
                                    className="mt-1 block w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md shadow-sm text-sm"
                                    onChange={(e) => setData('business_type', e.target.value)}
                                    required
                                >
                                    <option value="">Pilih Kategori</option>
                                    <option value="kuliner">Kuliner / Restoran</option>
                                    <option value="penginapan">Penginapan / Hotel</option>
                                    <option value="souvenir">Oleh-oleh / Souvenir</option>
                                    <option value="tour_guide">Pemandu Wisata / Tour Guide</option>
                                    <option value="transportasi">Transportasi / Rental</option>
                                    <option value="atraksi_wisata">Atraksi / Objek Wisata</option>
                                    <option value="lainnya">Lainnya</option>
                                </select>
                                <InputError message={errors.business_type} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="business_address" value="Alamat Lengkap Usaha" />
                                <textarea
                                    id="business_address"
                                    name="business_address"
                                    value={data.business_address}
                                    className="mt-1 block w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md shadow-sm text-sm"
                                    rows="3"
                                    onChange={(e) => setData('business_address', e.target.value)}
                                    required
                                ></textarea>
                                <InputError message={errors.business_address} className="mt-2" />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4 mt-2">
                        <h3 className="text-sm font-bold text-gray-700 mb-3">Keamanan Akun</h3>
                        <div className="space-y-4">
                            <div>
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

                            <div>
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
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end mt-8">
                    <Link
                        href={route('registrasi.select')}
                        className="text-xs text-gray-600 hover:text-gray-900 underline mr-4"
                    >
                        Kembali
                    </Link>

                    <PrimaryButton className="bg-amber-600 hover:bg-amber-700" disabled={processing}>
                        Daftar Sebagai Mitra
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}